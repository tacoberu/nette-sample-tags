<?php

namespace App\Business;

use Nette\Database\Connection;


class TagQuery
{

	private $conn;

	function __construct(Connection $conn)
	{
		$this->conn = $conn;
	}



	function totalCount(): int
	{
		return $this->conn->fetchField('SELECT COUNT(*) FROM tag');
	}



	function range(array $sort, int $offset, int $limit): array
	{
		if ($order = self::buildOrderClause($sort)) {
			$result = $this->conn->query("
				SELECT *
				FROM tag
				ORDER BY ", $order, "
				LIMIT ?
				OFFSET ?", $limit, $offset);
		}
		else {
			$result = $this->conn->query("
				SELECT *
				FROM tag
				LIMIT ?
				OFFSET ?", $limit, $offset);
		}
		$res = [];
		foreach ($result as $row) {
			$res[] = $row;
		}
		return $res;
	}



	private static function buildOrderClause(array $sort)
	{
		if (empty($sort)) {
			return Null;
		}

		foreach ($sort as $col => $dir) {
			switch ($dir) {
				case 'ASC':
					$sort[$col] = True;
					break;
				case 'DESC':
					$sort[$col] = False;
					break;
				default:
					throw new LogicException("Unsupported direction of sort: '{$dir}'.");
			}
		}
		return $sort;
	}
}
