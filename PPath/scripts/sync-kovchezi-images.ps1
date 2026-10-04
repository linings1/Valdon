$source = 'c:\Users\petya\Downloads\Petya_Valdon22.09\Petya_Valdon22.09\ковчези за сайта'
$dest = Join-Path $PSScriptRoot '..\Paypath_files\kovchezi'

if (-not (Test-Path -LiteralPath $source)) {
    Write-Error "Source folder not found: $source"
    exit 1
}

New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -LiteralPath (Join-Path $source '*') -Destination $dest -Force
Write-Host "Copied coffin images to $dest"
