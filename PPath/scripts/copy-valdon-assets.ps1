$srcRoot = 'C:\Users\petya\Desktop\valdon\websiteValdon\websiteValdon\img'
$dstRoot = Join-Path $PSScriptRoot '..\Paypath_files'

$dirs = @('pametnici', 'urni', 'cvetq', 'keturing', 'kovchezi')
foreach ($d in $dirs) {
    $src = Join-Path $srcRoot $d
    if (Test-Path -LiteralPath $src) {
        Copy-Item -LiteralPath $src -Destination (Join-Path $dstRoot $d) -Recurse -Force
    }
}

$files = @(
    'katafalka.jpg', 'kovchezi.jpg', 'urni.jpg', 'ketaring.jpg', 'cvetq.jpg',
    'pametnici.jpg', 'nekrolozi.jpg', 'keramichni_snimki.jpg', 'krust.jpg'
)
foreach ($f in $files) {
    $src = Join-Path $srcRoot $f
    if (Test-Path -LiteralPath $src) {
        Copy-Item -LiteralPath $src -Destination $dstRoot -Force
    }
}

Write-Host 'Assets copied to Paypath_files'
