<?php

namespace App\Business;

use Nette\Database\Connection;


class TagOneQuery
{

	private $conn;

	function __construct(Connection $conn)
	{
		$this->conn = $conn;
	}



	function fetchOne(int $id)
	{
		return $this->conn->fetch("
				SELECT *
				FROM tag
				WHERE id = ?
				", $id);
	}

}
