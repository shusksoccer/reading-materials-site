Set-StrictMode -Version Latest

function Resolve-PathSafe {
  param(
    [Parameter(Mandatory = $true)]
    [string]$BaseDir,
    [string]$PathValue
  )

  if ([string]::IsNullOrWhiteSpace($PathValue)) { return $null }
  if ([System.IO.Path]::IsPathRooted($PathValue)) {
    return [System.IO.Path]::GetFullPath($PathValue)
  }
  return [System.IO.Path]::GetFullPath((Join-Path $BaseDir $PathValue))
}

function Get-PortalConfig {
  param(
    [Parameter(Mandatory = $true)]
    [string]$PortalRoot
  )

  $configPath = Join-Path $PortalRoot "portal.config.json"
  if (-not (Test-Path -LiteralPath $configPath)) {
    throw "portal.config.json not found: $configPath"
  }

  return (Get-Content -LiteralPath $configPath -Raw -Encoding UTF8 | ConvertFrom-Json)
}

function Get-PortalPaths {
  param(
    [Parameter(Mandatory = $true)]
    [string]$PortalRoot
  )

  $config = Get-PortalConfig -PortalRoot $PortalRoot
  $contentSourceDir = Resolve-PathSafe -BaseDir $PortalRoot -PathValue $config.obsidian.contentSourceDir

  if ([string]::IsNullOrWhiteSpace($contentSourceDir)) {
    throw "obsidian.contentSourceDir is empty in portal.config.json"
  }
  if (-not (Test-Path -LiteralPath $contentSourceDir)) {
    throw "Obsidian contentSourceDir not found: $contentSourceDir"
  }

  $obsidianProjectRoot = Split-Path -Parent $contentSourceDir
  return [pscustomobject]@{
    PortalRoot          = $PortalRoot
    Config              = $config
    ObsidianContentDir  = $contentSourceDir
    ObsidianProjectRoot = $obsidianProjectRoot
  }
}

function Convert-ToSlug {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Text
  )

  $slug = $Text.ToLowerInvariant()
  $slug = $slug -replace "[^a-z0-9]+", "-"
  $slug = $slug.Trim("-")
  if ([string]::IsNullOrWhiteSpace($slug)) {
    return (Get-Date -Format "yyyyMMdd-HHmmss")
  }
  return $slug
}

function ConvertTo-JsonArrayLiteral {
  param(
    [AllowNull()]
    [object[]]$Items
  )

  if ($null -eq $Items -or $Items.Count -eq 0) { return "[]" }
  $normalized = @()
  foreach ($item in $Items) {
    if ($null -eq $item) { continue }
    $text = [string]$item
    if ([string]::IsNullOrWhiteSpace($text)) { continue }
    $normalized += $text.Trim()
  }
  if ($normalized.Count -eq 0) { return "[]" }
  return ($normalized | ConvertTo-Json -Compress)
}

