<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "newmanhattan";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

function getMenuItems() {
    global $conn;
    $sql = "SELECT id, name, description, price FROM menu";
    $result = $conn->query($sql);
    $menuItems = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $menuItems[] = $row;
        }
    }

    return json_encode($menuItems);
}

if (isset($_GET['action']) && $_GET['action'] === 'getMenuItems') {
    echo getMenuItems();
}