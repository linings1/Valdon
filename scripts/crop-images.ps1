Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\petya\.cursor\projects\c-Users-petya-Desktop-valdon-PPath-PPath-vscode\assets\c__Users_petya_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-3520757f-dce2-4f1d-8bca-c8045e0961fa.png'
$outDir = 'C:\Users\petya\Desktop\valdon\PPath\PPath\Paypath_files'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
New-Item -ItemType Directory -Force -Path 'C:\Users\petya\Desktop\valdon\PPath\PPath\images' | Out-Null

function Save-Crop($name, $x, $y, $w, $h) {
    $img = [System.Drawing.Image]::FromFile($src)
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $path = Join-Path $outDir $name
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
    Write-Output "Saved $name (${w}x${h})"
}

# 682x1024 mockup — hero below header bar
Save-Crop 'hero-full.png' 0 56 682 212
Copy-Item (Join-Path $outDir 'hero-full.png') 'C:\Users\petya\Desktop\valdon\PPath\PPath\images\hero-full.png' -Force
