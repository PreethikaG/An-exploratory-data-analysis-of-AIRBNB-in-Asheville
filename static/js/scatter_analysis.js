var host_rr_t = [];
var review_score_100_t = [];

var host_rr_f = [];
var review_score_100_f = [];


function getdata(){

    d3.csv('static/data/listing_detail_df_new.csv').then((data) => {
        console.log(data);

        // host_rr = data.map(row => row.host_response_rate);
        // review_score_100 = data.map(row => row.review_scores_rating);
        // superhost = data.map(row => row.host_is_superhost);
        
        // superhost_true = data.map(row => row.host_is_superhost === 't');
        // superhost_false = data.map(row => row.host_is_superhost === 'f');

        // console.log(superhost_true);
        // console.log(superhost_false);

        // host_rr_t = superhost_true.map(row => row.host_response_rate);
        // review_score_100_t = superhost_true.map(row => row.review_scores_rating);

        // host_rr_f = superhost_false.map(row => row.host_response_rate);
        // review_score_100_f = superhost_false.map(row => row.review_scores_rating);

        data.forEach(function(row) {
            if (row.host_is_superhost === 't')
            {
                host_rr_t.push(row.host_response_rate);
                review_score_100_t.push(row.review_scores_rating)

            }
            else
            {
                host_rr_f.push(row.host_response_rate);
                review_score_100_f.push(row.review_scores_rating)

            }
            

        });

        console.log(host_rr_t);
        console.log(review_score_100_t);

        var trace1 = {
                x: host_rr_t,
                y: review_score_100_t,
                type: 'scatter',
                mode:'markers',
                text: 'Is Super Host',
                name: 'Is a Super Host'
        }

        var trace2 = {
            x: host_rr_f,
            y: review_score_100_f,
            type: 'scatter',
            mode:'markers',
            text: 'Not a Super Host',
            name: 'Not a Super Host'
            
        }
        
        data = [trace1, trace2];

        






        // var trace1 = {
        //     x: host_rr_t,
        //     y: review_score_100_t,
        //     type: 'scatter',
        //     mode:'markers'
        // }

        // var trace2 = {
        //     x: host_rr_f,
        //     y: review_score_100_t,
        //     type: 'scatter',
        //     mode:'markers'
        // }



        // data = [trace];

        layout = {
            title : 'Scatter Plot showing Superhost corelation',
                xaxis :{
                    title:'Host Response Rate'
                },
                yaxis : {
                    title:'Review Score of Host'
                }
        }

        Plotly.newPlot("superhost",data,layout);
    });

}

getdata()