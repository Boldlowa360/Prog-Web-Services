using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using bruh.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<bruhContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("bruhContext") ?? throw new InvalidOperationException("Connection string 'bruhContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Allow all", policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("Allow all");

app.Run();
