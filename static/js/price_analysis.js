var  zero_day= [];
var  zero_price= [];

var one_day = [];
var one_price = [];

var two_day = [];
var two_price = [];

var three_day = [];
var three_price = [];

var four_day = [];
var four_price = [];

var five_day = [];
var five_price = [];

var six_day = [];
var six_price = [];


function getdata(){

    d3.csv('static/data/calendar_df_grouped_day.csv').then((data) => {
        console.log(data);

        day_col = data.map(row => row.dayname);
        // console.log(date_col);

        price_col = data.map(row => row.price);
        // console.log(price_col);

        data.forEach(row => {

            // var day_num = new Date(row.date);
            // console.log(day_num.getDay());

            if(row.dayname === 'Sunday')
            {
                zero_day.push(row.dayname);
                zero_price.push(row.price);

            }
            if(row.dayname === 'Monday')
            {
                one_day.push(row.dayname);
                one_price.push(row.price);

            }
            if(row.dayname === 'Tuesday')
            {
                two_day.push(row.dayname);
                two_price.push(row.price);

            }
            if(row.dayname === 'Wednesday')
            {
                three_day.push(row.dayname);
                three_price.push(row.price);

            }
            if(row.dayname === 'Thursday')
            {
                four_day.push(row.dayname);
                four_price.push(row.price);

            }
            
            if(row.dayname === 'Friday')
            {
                five_day.push(row.dayname);
                five_price.push(row.price);

            }

            if(row.dayname === 'Saturday')
            {
                six_day.push(row.dayname);
                six_price.push(row.price);

            }

        });

        var trace1 = {
            y: zero_price ,
            type: 'box',
            name: 'Sunday',
            boxmean: true
        };
          
        var trace2 = {
            y: one_price,
            type: 'box',
            name:'Monday',
            boxmean: true
        };
        
        var trace3 = {
            y: two_price,
            type: 'box',
            name:'Tuesday',
            boxmean: true
        };

        var trace4 = {
            y: three_price,
            type: 'box',
            name:'Wednesday',
            boxmean: true
        };

        var trace5 = {
            y: four_price,
            type: 'box',
            name:'Thursday',
            boxmean: true
        };

        var trace6 = {
            y: five_price,
            type: 'box',
            name:'Friday',
            boxmean: true
        };

        var trace7 = {
            y: six_price,
            type: 'box',
            name:'Saturday',
            boxmean: true
        };

        var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];
       
        layout = {
            title : 'Plot showing Price and Weekday corelation',
            xaxis :{
                title:'Days'
            },
            yaxis : {
                title:'Average Price of listing',
                // autotick: false,
                // ticks: 'outside',
                //tick0: 50,
                zeroline: true,
                range:[10,500]
                //dtick: 100,
                //ticklen: 1000
                // tickwidth: 4,
                // tickcolor: '#000'
            }
                
        }

        

        Plotly.newPlot("price", data, layout);
            
        
        // console.log(six_day);
        // console.log(six_price);




    });
}

function getdatamonth()
{
    d3.csv('static/data/calendar_df_grouped_month.csv').then((data) => {
        console.log(data);

        month_name = data.map(row => row.monthname);
        month_price = data.map(row => row.price);
        month_date = data.map(row => row.date);


        var trace1 = {
            x: month_date,
            y: month_price ,
            type: 'scatter',
            mode:'markers'
            // name: 'Sunday',
            // boxmean: true
        };

        var data = [trace1];

        var layout = {
            title : 'Plot showing Price and Month corelation',
            xaxis :{
                title:'Month'
            },
            yaxis : {
                title:'Average Price of listing',
                // autotick: false,
                // ticks: 'outside',
                //tick0: 50,
                zeroline: true,
                range:[10,500]
                //dtick: 100,
                //ticklen: 1000
                // tickwidth: 4,
                // tickcolor: '#000'
            }
        }

        Plotly.newPlot("pricemonth", data, layout);



    });




}

getdata()
getdatamonth()