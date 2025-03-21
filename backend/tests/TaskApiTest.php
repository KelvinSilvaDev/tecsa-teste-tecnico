<?php


use PHPUnit\Framework\TestCase;

/**
 * @covers \Namespace\ClasseAlvo
 */
class TaskApiTest extends TestCase
{
    public function testGetTasks()
    {
        // Exemplo simples: realiza uma requisição GET e verifica se a resposta não está vazia
        $response = file_get_contents('http://localhost:9000/backend/api/tasks');
        $this->assertNotEmpty($response, "A resposta não deve estar vazia");
    }
}
