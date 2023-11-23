using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TableAjaxEdit.Migrations
{
    public partial class CreateData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Salary = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Employee",
                columns: new[] { "Id", "CreatedDate", "Name", "Salary", "Status" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(779), "Andrew Peters", 3500000.0, true },
                    { 2, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(789), "Brice Lambson", 3600000.0, true },
                    { 3, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(790), "Andrew Johnson", 5400000.0, true },
                    { 4, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(791), "Rowan Miller", 5400000.0, true },
                    { 5, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(792), "Michael Peters", 3500000.0, true },
                    { 6, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(793), "John Miller", 1600000.0, true },
                    { 7, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(794), "Rowan Baker", 1400000.0, true },
                    { 8, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(795), "Tom Miller", 6400000.0, true },
                    { 9, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(797), "Marry Miller", 1500000.0, true },
                    { 10, new DateTime(2023, 11, 23, 15, 33, 11, 54, DateTimeKind.Local).AddTicks(798), "Harry Miller", 1400000.0, true }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employee");
        }
    }
}
