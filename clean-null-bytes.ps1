# PowerShell script to remove null bytes from markdown files
Write-Host "Finding markdown files with null bytes..." -ForegroundColor Yellow

$mdFiles = Get-ChildItem -Path "d:\aichiki\aichiki-blog\docs" -Filter "*.md" -Recurse -Force

$totalFiles = $mdFiles.Count
Write-Host "Checking $totalFiles markdown files" -ForegroundColor Cyan

$cleanedCount = 0

foreach ($file in $mdFiles) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)

        if ($content -match "`0") {
            $cleanedContent = $content -replace "`0", ""
            [System.IO.File]::WriteAllText($file.FullName, $cleanedContent)
            Write-Host "Cleaned: $($file.FullName)" -ForegroundColor Green
            $cleanedCount++
        }
    } catch {
        Write-Host "Failed to process: $($file.FullName) - $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Cleaning Complete ===" -ForegroundColor Green
Write-Host "Cleaned $cleanedCount files with null bytes" -ForegroundColor Green
Write-Host ""
