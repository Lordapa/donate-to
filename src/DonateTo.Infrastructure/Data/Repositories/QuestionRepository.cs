﻿using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class QuestionRepository : EntityFrameworkRepository<Question, DonateToDbContext>
    {
        public QuestionRepository(DonateToDbContext dbContext) : base(dbContext) { }
    }
}