<?php

namespace App\Business;

use Nette\Database\Connection;
use Nette\Database\UniqueConstraintViolationException;
use Nette\Utils\Validators;
use RuntimeException;



class TagCreateCommand
{
	private $conn;

	function __construct(Connection $conn)
	{
		$this->conn = $conn;
	}



	function doPersistNew(string $name): void
	{
		Validators::assert($name, 'string:1..63');
		try {
			$this->conn->query('INSERT INTO tag', [
				'name' => $name,
			]);
		}
		catch (UniqueConstraintViolationException $e) {
			throw new RuntimeException("Záznam '{$name}' v databázi již existuje.");
		}
	}

}
