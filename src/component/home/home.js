import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./main.css";
import SampleData from '../../constants/sampleData';
import { Bar } from 'react-chartjs-2';
import { AxisModel, Category, ChartComponent, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective} from'@syncfusion/ej2-react-charts';
import sampleData from "../../constants/sampleData";

function Home(props) {
    const state = {
        labels: ['01', '02', '03', '04', '05','06'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            data: [10, 4, 8, 1, 2,18]
          }
        ],
        axisX: {
            title: "Social Network",
            reversed: true,
        },
      }

    const AxisModel = { 
        valueType: 'Category'
    };
    
    const data = [
        { x: '01', y: 110 },
        { x: '02', y: 220 },
        { x: '03', y: 370 },
        { x: '04', y: 20 },
        { x: '05', y: 120 },
        { x: '06', y: 330 }
    ];

    const [dataCount, setDataCount] = useState(3);
    const [showFullData, setFullData] = useState(false);

    const showMoreData = () =>{
        let count = showFullData
          ? 3
          : SampleData.customerdata
          ? SampleData.customerdata.length
          : 3;
          setDataCount(count);
        setFullData(!showFullData);
      }

     
  return (
    <>
     <div className="mainContainer">
        <div className="flex">
            <div className="graphContiner">
                <div className="text">Orders Count</div>
                <div className="sectionDivider"></div>
                <div className="margin">
                    <Bar
                        data={state}
                        width={30}
                        height={15}
                        options={{
                        legend:{
                        display: false,
                        position:'right'
                        }
                    }}
                    />
                </div>
            </div>
            <div className="graphContiner1">
                <div className="text">Orders Total Price</div>
                <div className="sectionDivider"></div>
                <div className="margin">
                    <ChartComponent id='charts' primaryXAxis={AxisModel} height={'350px'}>
                        <Inject services={[LineSeries, Category]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' type='Line' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
        </div>
        <div className="tableContainer">
            <div className="tableHeading">Customers</div>
            <table>
                <thead>
                    <tr className="light-grey"> 
                        <td className="heading alignItems">Id</td>
                        <td className="heading">First Name</td>
                        <td className="heading">Last Name</td>
                        <td className="heading">Email</td>
                        <td className="heading">Created</td>
                        <td className="heading">Orders</td>
                    </tr>
                    {SampleData.customerdata.map((item, index) => 
                    {
                        if(index < dataCount) {
                            return (
                                <>     
                                <tr>
                                    <td className="alignItems">{item.id}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.created}</td>
                                    <td>{item.orders}</td> 
                                </tr>
                                </>
                            )
                        }
                    }
                    )}
                </thead>
            </table>
        </div>
    </div>
    </>
  );
}

export default withRouter(Home);