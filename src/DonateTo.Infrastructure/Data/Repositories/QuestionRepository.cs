﻿using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.Infrastructure.Data.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class QuestionRepository : EntityFrameworkRepository<Question, DonateToDbContext>, IQuestionRepository
    {
        public QuestionRepository(DonateToDbContext dbContext) : base(dbContext) { }

        void IQuestionRepository.BulkUpdate(IEnumerable<Question> entities)
        {
            throw new System.NotImplementedException();
        }

        public async Task BulkUpdateAsync(IEnumerable<Question> updatedQuestions)
        {
            using var transaction = DbContext.Database.BeginTransaction();

            try
            {
                var removedQuestions = await Get(null)
                    .Where(q => !updatedQuestions
                    .Select(uq => uq.Id)
                    .Contains(q.Id)).ToListAsync().ConfigureAwait(false);

                var addedQuestions = updatedQuestions.Where(uq => uq.Id == 0);

                updatedQuestions = updatedQuestions.Where(uq => !addedQuestions.Contains(uq));

                foreach (var question in removedQuestions)
                {
                    await DeleteAsync(question.Id).ConfigureAwait(false);
                }

                foreach (var question in addedQuestions)
                {
                    await AddAsync(question).ConfigureAwait(false);
                }

                foreach (var question in updatedQuestions)
                {
                    await UpdateAsync(question).ConfigureAwait(false);
                }

                await DbContext.SaveChangesAsync().ConfigureAwait(false);
                await transaction.CommitAsync().ConfigureAwait(false);
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync().ConfigureAwait(false);
                throw;
            }
        }
    }
}