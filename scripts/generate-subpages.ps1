$root = Join-Path $PSScriptRoot '..'
$configPath = Join-Path $PSScriptRoot 'subpages.json'
$pages = Get-Content -LiteralPath $configPath -Raw -Encoding UTF8 | ConvertFrom-Json
$templatePath = Join-Path $PSScriptRoot 'subpage-template.html'
$template = Get-Content -LiteralPath $templatePath -Raw -Encoding UTF8

foreach ($p in $pages) {
    $html = $template.Replace('{{TITLE}}', $p.title).Replace('{{DESC}}', $p.desc).Replace('{{SECTION}}', $p.section)
    $out = Join-Path $root ($p.slug + '.html')
    $utf8 = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($out, $html, $utf8)
}
Write-Host "Generated $($pages.Count) pages"
