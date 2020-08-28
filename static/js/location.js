
var zip =[];
var valueCount =[];
var zipLabel = ['Candler','Fletcher','Arden','Azalea','Woodfin-04','Biltmore','Woodfin-01','Bent Creek']

function createPlot()
{

    d3.csv('static/data/listings_details.csv').then((data) => {
        console.log(data);
        var zipDict ={};
        zipcode = data.map(row => row.neighbourhood_cleansed);
        for (var i=0; i<zipcode.length; i++)
        {
            var currentZip = zipcode[i];

            if (currentZip in zipDict)
            {
                zipDict[currentZip] += 1;
            }
            else
            {
                zipDict[currentZip] = 1;

            }

            
        }
        console.log(zipDict);
        

        var zipSorted = sortobject(zipDict);
        console.log(zipSorted);

        var zipReverse = zipSorted.reverse();
        console.log(zipReverse);


        

        for(var i=0; i<zipReverse.length; i++)
        {
            zip.push(zipReverse[i][0]);
            valueCount.push(zipReverse[i][1]);
        }

        console.log(zip);
        console.log(valueCount);

        x_bar = valueCount;
        y_bar = zip;

        var trace ={
            x: x_bar,
            y: zipLabel,
            //text: text_labels,
            type:"bar",
            orientation:'h',
            marker: {
                color: 'rgba(222,45,38,0.8)',
                opacity: 0.6,
            }
            
        };
        
        
 

        var data = [trace];

        var layout = {
            title : 'Listing Count Area-wise',
            font:{
                family: 'Raleway, sans-serif'
            },
            xaxis :{
                title:'Listing Count'
            },
            yaxis : {
                title:'Area'
            }
        }
    
        Plotly.newPlot("location_analysis",data,layout);



    });
}

createPlot()

function sortobject(object)
{
    return Object.entries(object).sort((a,b) => b[1] - a[1])
}