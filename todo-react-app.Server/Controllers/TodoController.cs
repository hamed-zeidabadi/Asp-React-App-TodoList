using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoListApp.Data;
using TodoListApp.Models;

namespace TodoListApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TodoController : ControllerBase
    {

        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IEnumerable<Todo>> GetTodos()
        {
            var todos = await _context.Todos.ToListAsync();
             return todos;
        }


        [HttpPost]
        public async Task<IActionResult> CreateTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            var responseMessage = "A new task has been created successfully!";
          
            return new JsonResult(responseMessage)
            {
                StatusCode = 200, 
                ContentType = "text/plain"
            };

        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, Todo updatedTodo)
        {
            var existingTodo = await _context.Todos.FindAsync(id);

            if (existingTodo == null)
            {
                return NotFound(); 
            }

            existingTodo.Title = updatedTodo.Title;
            existingTodo.IsCompleted = updatedTodo.IsCompleted;

            await _context.SaveChangesAsync();

            var responseMessage = $"Task with ID {{id}} has been successfully updated!";
            return new JsonResult(responseMessage)
            {
                StatusCode = 200,
                ContentType = "text/plain"
            };
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todoToDelete = await _context.Todos.FindAsync(id);

            if (todoToDelete == null)
            {
                return NotFound(); 
            }

            _context.Todos.Remove(todoToDelete);
            await _context.SaveChangesAsync();

            var responseMessage = $"Task with ID {id} has been successfully deleted!";
            return new JsonResult(responseMessage)
            {
                StatusCode = 200,
                ContentType = "text/plain"
            };
        }




    }




}
