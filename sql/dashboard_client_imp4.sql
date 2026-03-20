alter table public.profiles drop column billing_country;
alter table public.profiles add column billing_country varchar(50 default 'Germany' );