<?php

namespace App\Business;

use Nette\Database\Connection;
use Nette\Utils\Validators;


class TagRemoveCommand
{
	private $conn;

	function __construct(Connection $conn)
	{
		$this->conn = $conn;
	}



	function doRemove(int $id): void
	{
		Validators::assert($id, 'int:1..');
		$this->conn->query('DELETE FROM tag WHERE id = ?', $id);
	}

}
