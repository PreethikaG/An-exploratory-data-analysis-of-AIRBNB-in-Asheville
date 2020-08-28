var year = [];
var valueCount =[];

function readData(){
    d3.json('/growth_analysis_js').then((data) => {
        console.log(data);
        var hostSince = data.map(row => row.host_since);
        // //console.log(hostSince);
        sorted = hostSince.sort();
        //console.log(sorted);
        // // splitArray = sorted.split("-",1);
        // // console.log(splitArray);
        // // sorted.forEach((object) => {
        // //   console.log(object.split("-",1));
        // // });
        var splitArray =[];
        var yearDict = {};
        
        for(var i=0;i<sorted.length;i++)
        {
           var splitValue = sorted[i].split(" ",4);
           splitArray.push(splitValue[3]);
        }
        // console.log(splitArray);

        for (var i=0; i<splitArray.length; i++)
        {
            var currentYear = splitArray[i];

            if (currentYear in yearDict)
            {
                yearDict[currentYear] += 1;
            }
            else
            {
                yearDict[currentYear] = 1;

            }

            
        }
        console.log(yearDict);
        console.log(Object.entries(yearDict));
        Object.entries(yearDict).forEach(function([key,value]){
            year.push(key);
            valueCount.push(value);
        });

        console.log(year);
        console.log(valueCount);

        var totalCount =[];
        var total_temp = valueCount[0];
        totalCount.push(total_temp);

        for(var i=1; i<=valueCount.length; i++)
        {
            temp = valueCount[i]+totalCount[i-1];
            //total=total_temp

            totalCount.push(temp);

        }
        
        console.log(temp);

        var trace1 ={
            x: year,
            y: valueCount,
            //text: valueCount,
            type:'scatter',
            name:'New Listings'
        }

        var trace2 ={
            x: year,
            y: totalCount,
            type:'scatter',
            name:'Total Listings'
        }

        data =[trace1 , trace2];

        layout = {
            title : 'Growth analysis of Airbnb',
                xaxis :{
                    title:'Year'
                },
                yaxis : {
                    title:'Numner of listings'
                }
        }

        Plotly.newPlot("growth_analysis",data,layout);
    });

}

readData()
