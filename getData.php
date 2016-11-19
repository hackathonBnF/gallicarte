<?php
//Retrieves the results from Gallica
if(isset($_GET["q"])){
   $query = $_GET["q"];
   $fullQuery = 'http://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&maximumRecords=10&startRecord=1&query='.str_replace("\"","%22",str_replace(" ","%20",$query));
   //echo $fullQuery;
   $homepage = file_get_contents($fullQuery);
   //text%20any%20%22mar%C3%A2tre%22
   echo $homepage;
}

?>