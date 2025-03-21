<?php


use PHPUnit\Framework\TestCase;

/**
 * @covers \Namespace\ClasseAlvo
 */
class TaskApiTest extends TestCase
{
    public function testGetTasks()
    {
        $response = file_get_contents('http://localhost:9000/api/tasks');
        $this->assertNotEmpty($response, "A resposta não deve estar vazia");
    }
}
