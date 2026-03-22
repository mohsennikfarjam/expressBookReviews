$baseUrl = "http://localhost:5000"
$auth = @{username="mohsennikfarjam"; password="password123"}
$jsonAuth = $auth | ConvertTo-Json

"--- TASK 1: REGISTER ---"
$reg = Invoke-WebRequest -Method Post -Uri "$baseUrl/register" -ContentType "application/json" -Body $jsonAuth
$reg.Content | Out-File -FilePath "register_output.txt"
$reg.Content

"--- TASK 2: LOGIN ---"
$sess = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$login = Invoke-WebRequest -Method Post -Uri "$baseUrl/customer/login" -ContentType "application/json" -Body $jsonAuth -WebSession $sess
$login.Content | Out-File -FilePath "login_output.txt"
$login.Content

"--- TASK 3: GET ALL BOOKS ---"
$allBooks = Invoke-WebRequest -Method Get -Uri "$baseUrl/"
$allBooks.Content | Out-File -FilePath "getallbooks_output.txt"

"--- TASK 4: GET BY ISBN ---"
$isbnBook = Invoke-WebRequest -Method Get -Uri "$baseUrl/isbn/1"
$isbnBook.Content | Out-File -FilePath "getbooksbyISBN_output.txt"

"--- TASK 5: GET BY AUTHOR ---"
$authorBooks = Invoke-WebRequest -Method Get -Uri "$baseUrl/author/Chinua Achebe"
$authorBooks.Content | Out-File -FilePath "getbooksbyauthor_output.txt"

"--- TASK 6: GET BY TITLE ---"
$titleBooks = Invoke-WebRequest -Method Get -Uri "$baseUrl/title/Things Fall Apart"
$titleBooks.Content | Out-File -FilePath "getbooksbytitle_output.txt"

"--- TASK 7: GET REVIEWS ---"
$reviews = Invoke-WebRequest -Method Get -Uri "$baseUrl/review/1"
$reviews.Content | Out-File -FilePath "getbookreview_output.txt"

"--- TASK 8: ADD REVIEW ---"
$addReview = Invoke-WebRequest -Method Put -Uri "$baseUrl/customer/auth/review/1?review=Excellent" -WebSession $sess
$addReview.Content | Out-File -FilePath "reviewadded_output.txt"
$addReview.Content

"--- TASK 9: DELETE REVIEW ---"
$delReview = Invoke-WebRequest -Method Delete -Uri "$baseUrl/customer/auth/review/1" -WebSession $sess
$delReview.Content | Out-File -FilePath "deletereview_output.txt"
$delReview.Content
