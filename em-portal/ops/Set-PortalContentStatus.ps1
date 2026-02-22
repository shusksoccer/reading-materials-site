param(
  [ValidateSet("inbox", "reviewed", "published", "unknown")]
  [string]$Status,
  [ValidateSet("lessons", "worksheets", "glossary", "figures", "library", "people", "faq", "all")]
  [string]$Kind = "all",
  [string]$Slug = "",
  [switch]$Force,
  [switch]$WhatIf
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$portalRoot = Split-Path -Parent $scriptDir
. (Join-Path $scriptDir "Portal-Common.ps1")

function Get-TargetFiles {
  param(
    [Parameter(Mandatory = $true)]
    [string]$ContentDir,
    [Parameter(Mandatory = $true)]
    [string]$TargetKind,
    [string]$TargetSlug
  )

  $kinds = if ($TargetKind -eq "all") {
    @("lessons", "worksheets", "glossary", "figures", "library", "people", "faq")
  } else {
    @($TargetKind)
  }

  $files = @()
  foreach ($k in $kinds) {
    $dir = Join-Path $ContentDir $k
    if (-not (Test-Path -LiteralPath $dir)) { continue }
    if ([string]::IsNullOrWhiteSpace($TargetSlug)) {
      $files += Get-ChildItem -LiteralPath $dir -File -Filter *.md
    } else {
      $path = Join-Path $dir "$TargetSlug.md"
      if (Test-Path -LiteralPath $path) {
        $files += Get-Item -LiteralPath $path
      }
    }
  }
  return $files
}

function Set-FrontmatterStatus {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Raw,
    [Parameter(Mandatory = $true)]
    [string]$StatusValue,
    [switch]$ForceReplace,
    [ref]$Changed,
    [ref]$Reason
  )

  $Changed.Value = $false
  $Reason.Value = ""

  if (-not $Raw.StartsWith("---`n")) {
    $Reason.Value = "no_frontmatter"
    return $Raw
  }

  $second = $Raw.IndexOf("`n---`n", 4)
  if ($second -lt 0) {
    $Reason.Value = "no_frontmatter_end"
    return $Raw
  }

  $fm = $Raw.Substring(4, $second - 4)
  $body = $Raw.Substring($second + 5)
  $lines = [System.Collections.Generic.List[string]]::new()
  foreach ($line in ($fm -split "`r?`n")) {
    [void]$lines.Add($line)
  }

  $statusLineIndex = -1
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s*status\s*:') {
      $statusLineIndex = $i
      break
    }
  }

  if ($statusLineIndex -ge 0) {
    if (-not $ForceReplace) {
      $Reason.Value = "status_exists"
      return $Raw
    }
    $lines[$statusLineIndex] = "status: ""$StatusValue"""
    $Changed.Value = $true
  } else {
    $insertIndex = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
      if ($lines[$i] -match '^\s*(tags|sources)\s*:') {
        $insertIndex = $i + 1
      }
    }
    if ($insertIndex -lt 0 -or $insertIndex -gt $lines.Count) {
      $insertIndex = $lines.Count
    }
    $lines.Insert($insertIndex, "status: ""$StatusValue""")
    $Changed.Value = $true
  }

  if (-not $Changed.Value) {
    $Reason.Value = "no_change"
    return $Raw
  }

  $newFm = ($lines -join [Environment]::NewLine)
  return ("---" + [Environment]::NewLine + $newFm + [Environment]::NewLine + "---" + [Environment]::NewLine + $body)
}

$paths = Get-PortalPaths -PortalRoot $portalRoot
$contentDir = $paths.ObsidianContentDir
$files = Get-TargetFiles -ContentDir $contentDir -TargetKind $Kind -TargetSlug $Slug

if ($files.Count -eq 0) {
  Write-Host "No target markdown files found under: $contentDir"
  Write-Host "Kind=$Kind Slug=$Slug"
  exit 0
}

$updated = 0
$skippedNoFrontmatter = 0
$skippedExists = 0
$skippedOther = 0

foreach ($file in $files) {
  $raw = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  $changed = $false
  $reason = ""
  $newRaw = Set-FrontmatterStatus -Raw $raw -StatusValue $Status -ForceReplace:$Force -Changed ([ref]$changed) -Reason ([ref]$reason)

  if (-not $changed) {
    switch ($reason) {
      "status_exists" { $skippedExists++ }
      "no_frontmatter" { $skippedNoFrontmatter++ }
      "no_frontmatter_end" { $skippedNoFrontmatter++ }
      default { $skippedOther++ }
    }
    Write-Host "[Skip] $($file.FullName) ($reason)"
    continue
  }

  if ($WhatIf) {
    Write-Host "[WhatIf] $($file.FullName) -> status=$Status"
    $updated++
    continue
  }

  Set-Content -LiteralPath $file.FullName -Value $newRaw -Encoding UTF8
  Write-Host "[Update] $($file.FullName) -> status=$Status"
  $updated++
}

Write-Host ""
Write-Host "Done."
Write-Host "Updated: $updated"
Write-Host "Skipped(status exists): $skippedExists"
Write-Host "Skipped(no frontmatter): $skippedNoFrontmatter"
Write-Host "Skipped(other): $skippedOther"

