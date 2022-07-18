# restaurant


1.Before starting 1st time server please ensure restro_table.sync({ force: true }).({ force: true }) is only for 1st time for creation of table.after
that just restro_table.sync({ force: false });
2.restro_table.sync({ force: true }).then(()=>initial()). initial() use only for 1st for raw data entry in db after that remove this method from restro_table.sync({ force: false })
restro_table.sync({ force: true }).then(()=>initial()) ----> restro_table.sync({ force: false })