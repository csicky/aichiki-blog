# PowerShell script to find encoding issues in markdown files
Write-Host "Finding markdown files with encoding issues..." -ForegroundColor Yellow

$mdFiles = Get-ChildItem -Path "d:\aichiki\aichiki-blog\docs" -Filter "*.md" -Recurse -Force

$totalFiles = $mdFiles.Count
Write-Host "Checking $totalFiles markdown files" -ForegroundColor Cyan

$issueFiles = @()

foreach ($file in $mdFiles) {
    try {
        # Read as bytes to check for null bytes
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)

        # Check for null bytes (0x00)
        if ($bytes -contains 0x00) {
            Write-Host "Found null bytes in: $($file.FullName)" -ForegroundColor Red
            $issueFiles += $file.FullName
        }
    } catch {
        Write-Host "Failed to process: $($file.FullName) - $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Check Complete ===" -ForegroundColor Green
Write-Host "Found $($issueFiles.Count) files with null bytes" -ForegroundColor Green

if ($issueFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "Files with issues:" -ForegroundColor Yellow
    foreach ($file in $issueFiles) {
        Write-Host "  $file" -ForegroundColor Red
    }
}

Write-Host ""
