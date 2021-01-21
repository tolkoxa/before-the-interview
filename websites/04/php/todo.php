<?php
$json = json_decode(file_get_contents('../data/todo.json'), true);

$json['books'][] = [
  'email' => 'tolkoxa@ya.ru',
  'author' => 'tolkoxa',
  'created' => '16.01.2021 12:43:42',
];

file_put_contents('../data/todo.json', json_encode($json));
?>