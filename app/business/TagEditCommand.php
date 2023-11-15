<?php

namespace App\Business;

use Nette\Database\Connection;
use Nette\Database\UniqueConstraintViolationException;
use Nette\Utils\Validators;
use RuntimeException;



class TagEditCommand
{
	private $conn;

	function __construct(Connection $conn)
	{
		$this->conn = $conn;
	}



	function doPersistChanges(int $id, string $name): void
	{
		Validators::assert($id, 'int:1..');
		Validators::assert($name, 'string:1..63');
		try {
			$this->conn->query('UPDATE tag SET', [
				'name' => $name,
			], 'WHERE id = ?', $id);
		}
		catch (UniqueConstraintViolationException $e) {
			throw new RuntimeException("Záznam '{$name}' v databázi již existuje.");
		}
	}

}
