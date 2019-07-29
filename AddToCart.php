<?php
session_start();
header('Content-Type: text/xml');
?>
<?php
        $newitem = $_GET["name"];
        $action = $_GET["action"];
        //if ($_SESSION["Cart"] != "")
		if (array_key_exists("Cart", $_SESSION))
        {
            $MDA = $_SESSION["Cart"];
            if ($action == "Add")
            {
                if ($MDA[$newitem] != "")
                {  
                    $value = $MDA[$newitem] + 1;
                    $MDA[$newitem] = $value;
                }
                else
                {
                    $MDA[$newitem] = "1";
                }
            }
            else
            {
                $MDA= "";
            }
        }
        else
        {
            $MDA[$newitem] = "1";
        }
        $_SESSION["Cart"] = $MDA; 
        ECHO (toXml($MDA));         								
    
    function toXml($MDA)
    {
        $doc = new DomDocument('1.0');
        $cart = $doc->createElement('cart');
        $cart = $doc->appendChild($cart);
        
        foreach ($MDA as $a => $b)
        {
        
        $name = $doc->createElement('name');
        $name = $cart->appendChild($name);

        $sizes = $doc->createElement('sizes'); 
        $sizes = $name->appendChild($sizes);   
        $value = $doc->createTextNode($a);
        $value = $sizes->appendChild($value);

        $price = $doc->createElement('price');
        $price = $name->appendChild($price);
        $value2 = $doc->createTextNode($b);
        $value2 = $price->appendChild($value2);
     
      }

        $strXml = $doc->saveXML(); 
        return $strXml;
    }
?>
