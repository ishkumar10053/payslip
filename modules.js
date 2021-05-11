const index = (req,res) => {
    res.render('index.ejs');
}

const pageNotFound = (req,res) => {
    res.render('notfound.ejs');
}

const generateSlip = (req,res) => {
    let response = {};
    if(req.body){
        if(req.body.firstName == '' || req.body.lastName == '' || req.body.annualSalary == '' || !req.body.annualSalary.match(/^[0-9]+$/) || req.body.superRate == '' || !req.body.superRate.match(/^[0-9]+$/) || req.body.paymentDate == ''){
            response.code = 0;
            response.message = 'Fill all fields in proper format!';
            res.json(response);
        }else{
            data = {};
            if(req.body.annualSalary <= 18200){
                data.incomeTax = 0;
            }else if(req.body.annualSalary >= 18201 && req.body.annualSalary <= 37000){
                var minusAmount = req.body.annualSalary - 18200;
                var final = minusAmount * 0.19;
                data.incomeTax = (final/12).toFixed();
            }else if(req.body.annualSalary >= 37001 && req.body.annualSalary <= 87000){
                var minusAmount = req.body.annualSalary - 37000;
                var final = 3572+(minusAmount * 0.325);
                data.incomeTax = (final/12).toFixed();
            }else if(req.body.annualSalary >= 87001 && req.body.annualSalary <= 180000){
                var minusAmount = req.body.annualSalary - 87000;
                var final = 19822+(minusAmount * 0.37);
                data.incomeTax = (final/12).toFixed();
            }else if(req.body.annualSalary >= 180001){
                var minusAmount = req.body.annualSalary - 180000;
                var final = 54232+(minusAmount * 0.45);
                data.incomeTax = (final/12).toFixed();
            }
            data.name = req.body.firstName+' '+req.body.lastName;
            data.payPeriod = req.body.paymentDate;
            data.grossIncome = (req.body.annualSalary/12).toFixed();
            data.super = (((req.body.annualSalary/12)*req.body.superRate)/100).toFixed();
            data.netIncome = data.grossIncome-data.incomeTax;
            response.code = 200;
            response.message = 'Done';
            response.data = data;
            res.json(response);
        }
    }else{
        response.code = 0;
        response.message = 'Fill all fields in proper format!';
        res.json(response);
    }
}

module.exports = {
    index,
    pageNotFound,
    generateSlip
}