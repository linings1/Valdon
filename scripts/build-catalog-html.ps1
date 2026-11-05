param(
    [string]$ImageDir,
    [string]$WebPrefix,
    [string]$CaptionPrefix = 'Пример',
    [switch]$UseFileNameAsCaption
)

$files = Get-ChildItem -LiteralPath $ImageDir -File | Sort-Object { [int]($_.BaseName -replace '\D','') }, Name
$items = foreach ($f in $files) {
    $cap = if ($UseFileNameAsCaption) { $f.BaseName } else { "$CaptionPrefix $($f.BaseName)" }
    $src = "$WebPrefix/$($f.Name)" -replace ' ', '%20'
    $alt = [System.Web.HttpUtility]::HtmlEncode($cap)
    "                <li><figure><img src=`"$src`" alt=`"$alt`" loading=`"lazy`"><figcaption>$cap</figcaption></figure></li>"
}
$items -join "`n"
