﻿using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.ApplicationCore.Entities
{
    public class QuestionOption : EntityBase, IIsDeleted
    {
        public string Label { get; set; }
        public string Value { get; set; }
        public decimal Weight { get; set; }
        public decimal? MinimumRelative { get; set; }
        public decimal? MaximumRelative { get; set; }
        public long QuestionId { get; set; }
        public Question Question { get; set; }
        public bool IsDeleted { get; set; }
    }
}