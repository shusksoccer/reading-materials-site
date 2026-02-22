param(
  [ValidateSet("library", "glossary", "people", "faq", "figures", "lessons", "worksheets")]
  [string]$Kind = "library",
  [string]$Slug,
  [string]$InputFile,
  [string]$OutputPath = ""
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

if ([string]::IsNullOrWhiteSpace($Slug) -and [string]::IsNullOrWhiteSpace($InputFile)) {
  throw "Specify either -Slug or -InputFile."
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$portalRoot = Split-Path -Parent $scriptDir
. (Join-Path $scriptDir "Portal-Common.ps1")

$paths = Get-PortalPaths -PortalRoot $portalRoot
$projectRoot = $paths.ObsidianProjectRoot

if (-not [string]::IsNullOrWhiteSpace($InputFile)) {
  $notePath = Resolve-PathSafe -BaseDir $portalRoot -PathValue $InputFile
} else {
  $notePath = Join-Path (Join-Path $paths.ObsidianContentDir $Kind) "$Slug.md"
}

if (-not (Test-Path -LiteralPath $notePath)) {
  throw "Note not found: $notePath"
}

$raw = Get-Content -LiteralPath $notePath -Raw -Encoding UTF8
$noteName = [System.IO.Path]::GetFileNameWithoutExtension($notePath)

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
  $outDir = Join-Path $projectRoot "_ai\prompts\out"
  if (-not (Test-Path -LiteralPath $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
  }
  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $OutputPath = Join-Path $outDir "$timestamp-$noteName-edit-prompt.md"
} else {
  $OutputPath = Resolve-PathSafe -BaseDir $portalRoot -PathValue $OutputPath
  $parent = Split-Path -Parent $OutputPath
  if ($parent -and -not (Test-Path -LiteralPath $parent)) {
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
  }
}

$codeFence = '```'
$parts = @(
  "# AI Edit Prompt for $noteName",
  "",
  "Edit the following Markdown note for clarity and structure.",
  "",
  "Goals:",
  "- Improve readability and organization",
  "- Separate facts, inferences, and TODO checks",
  "- Keep it reusable for future portal content",
  "",
  "Constraints:",
  "- Do not rename frontmatter keys",
  "- Do not remove slug, title, tags, or sources",
  "- Keep tags and sources as arrays",
  "- Mark unsupported claims as TODO-CHECK",
  "- Return Markdown only (no extra explanation)",
  "",
  "Input note:",
  "",
  "${codeFence}markdown",
  $raw.TrimEnd(),
  $codeFence,
  ""
)

$prompt = $parts -join [Environment]::NewLine
Set-Content -LiteralPath $OutputPath -Value $prompt -Encoding UTF8
Write-Host "Prompt generated: $OutputPath"

