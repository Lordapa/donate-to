﻿namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequestItem : EntityBase
    {
        public string Title { get; set; }
        public string Observation { get; set; }
        public decimal CurrentQuantity { get; set; }
        public decimal FinishQuantity { get; set; }
    }
}