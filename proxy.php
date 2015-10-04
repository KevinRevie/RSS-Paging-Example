<?php
// Set the return content type
header('Content-type: application/json');

// Website url to open
$url = 'http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&noOfReviews='+$_GET['noOfReviews']+'&internal=1&yelp=1&google=1&offset='+$_GET['offset']+'&threshold=1';

// Get that website's content
$handle = fopen($url, "r");

// If there is something, read and return
if ($handle) {
    while (!feof($handle)) {
        $buffer = fgets($handle, 4096);
        echo $buffer;
    }
    fclose($handle);
}
?>