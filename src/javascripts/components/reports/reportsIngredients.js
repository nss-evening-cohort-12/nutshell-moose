import './reports.scss';
import Chart from 'chart.js';
import moment from 'moment';
import utils from '../../helpers/utils';
import ingredientsSmash from '../../helpers/data/ingredientsSmash';

const drawIngredients = () => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const domString = ` 
    <div class="row d-flex justify-content-center reportsSelection">
    <div class="col-8 d-flex justify-content-center flex-column">
      <label class="btn btn-primary active">
      <input type="radio" name="options" id="1IngredDay" value="1IngredDay"> 1 Day
      </label>
      <label class="btn btn-primary">
      <input type="radio" name="options" id="7IngredDay" value="7IngredDay" checked> Date Range
      </label>
      <label class="btn btn-primary">
        <input type="radio" name="options" id="allIngredDays" value="allIngredDays"> All Days
      </label>
    </div>
    <div class="row col-8 justify-content-center">
    <div id="dateContainer" class="col-6 justify-content-center">
    <div id='datePicker1' class="m-1">
    <label for="1date">1 Day/Start Date</label>
    <input type="date" class="m-1 form-control" id="1IngredDate" value="${today}">
    </div>
    <div id='datePicker2' class="m-1">
    <label for="7date">End Date</label>
    <input type="date" class="m-1 form-control" id="7IngredDate" value="${today}">
    </div>
    </div>
    </div>
    <div class="row col-8 flex-column">
    <button id="ingredientsSubmit" class="mt-3 btn btn-primary submit">Submit</button>
    </div>
    </div>
    <div id="reportsIngredDisplay"></div>
    <div id="buildChart" class="col-md-6 offset-md-3 hide">
      <div class="card">
        <div class="card-body card-header1">
          <canvas id="myChart" width="100" height="100"></canvas>
        </div>
      </div>
    </div>
    `;
  utils.printToDom('#ingredientsDiv', domString);
};

const get7DayIngredients = () => {
  const pickDate1 = $('#1IngredDate').val();
  const pickDate2 = $('#7IngredDate').val();
  // get reservations in the range of these dates
  let domString = '';
  ingredientsSmash.get7DayIngredAmount(pickDate2, pickDate1)
    .then((rawIngredients) => {
      domString += `
        <div class="mt-3 card text-center">
          <div class="card-header">
            Ingredients Used
          </div>
          <div class="card-body">
            <h2 class="card-title">Amount of Ingredients Used</h2>
            <h2 class="card-text">From ${pickDate1} to ${pickDate2}</h2>`;
      const keys = Object.keys(rawIngredients);
      keys.forEach((key) => {
        domString += `
            <h3 class="card-text"> ${key}: ${rawIngredients[key]}</h3>`;
      });
      domString += `
          </div>
          <div class="card-footer text-muted">
          </div>
        </div>
      `;
      utils.printToDom('div #reportsIngredDisplay', domString);
    })
    .catch((err) => console.warn('did not bring the reservation ', err));
};

const getOneDayIngredients = () => {
  const pickDate1 = $('#1IngredDate').val();
  // get reservations in the range of these dates
  let domString = '';
  ingredientsSmash.getOneDayIngredAmount(pickDate1)
    .then((rawIngredients) => {
      domString += `
        <div class="mt-3 card text-center">
          <div class="card-header">
            Ingredients Used
          </div>
          <div class="card-body">
            <h2 class="card-title">Amount of Ingredients Used</h2>
            <h2 class="card-text">on ${pickDate1}</h2>`;
      const labels = [];
      const dataSets = [];
      const cTitle = `Amount of Ingredients Used on ${pickDate1}`;
      const keys = Object.keys(rawIngredients);
      keys.forEach((key) => {
        domString += `
            <h3 class="card-text"> ${key}: ${rawIngredients[key]}</h3>`;
        // console.warn(key);
        labels.push(key);
        dataSets.push(rawIngredients[key]);
      });
      domString += `
          </div>
          <div class="card-footer text-muted">
          </div>
        </div>        
      `;
      const buildTextCard = domString;
      const domChart = `
        <div id="buildChart" class="mb-3 col-md-6 offset-md-3 hide">
          <div class="card">
            <div class="card-body card-header1">
              <canvas id="myChart" width="70" height="70"></canvas>
            </div>
          </div>
        </div>      
      `;
      domString = '';
      domString += `
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Ingredients Used Report</a>
            <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Chart</a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">${buildTextCard}</div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">${domChart}</div>
        </div>
      `;
      utils.printToDom('div #reportsIngredDisplay', domString);
      $('#buildChart').removeClass('hide');
      $('buildChart').css('background-color', 'red');
      // eslint-disable-next-line no-use-before-define
      drowChart(labels, dataSets, cTitle);
    })
    .catch((err) => console.warn('did not bring the reservation ', err));
};

const drowChart = (labelArr, dataArr, cTitle) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labelArr,
      datasets: [{
        data: dataArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
        ],
        borderWidth: 1,
      }],
    },
    options: {
      title: {
        text: cTitle,
        display: true,
      },
      legend: {
        display: true,
        position: 'right',
      },
    },
  });
  console.warn(myChart);
  // const domString = myChart;
  // utils.printToDom('#myChart', domString);
};

const getAllDayIngredients = () => {
  // get reservations in the range of these dates
  let domString = '';
  ingredientsSmash.getAllDayIngredAmount()
    .then((rawIngredients) => {
      domString += `
        <div class="mt-3 card text-center">
          <div class="card-header">
            Ingredients Used
          </div>
          <div class="card-body">
            <h2 class="card-title">Amount of Ingredients Used </h2>
            <h2 class="card-text">since La Baguette opened</h2>`;
      const keys = Object.keys(rawIngredients);
      keys.forEach((key) => {
        domString += `
            <h3 class="card-text"> ${key}: ${rawIngredients[key]}</h3>`;
      });
      domString += `
          </div>
          <div class="card-footer text-muted">
          </div>
        </div>
      `;
      utils.printToDom('div #reportsIngredDisplay', domString);
    })
    .catch((err) => console.warn('did not bring the reservation ', err));
};

const pickReport = () => {
  const radioVal = $('input[name="options"]:checked').val();
  let pickDate1;
  let pickDate2;
  switch (radioVal) {
    case '1IngredDay':
      // console.warn('this is one day report', valid);
      pickDate1 = $('#1IngredDate').val();
      if (pickDate1) {
        // eslint-disable-next-line no-use-before-define
        getOneDayIngredients();
        // drowChart();
        // console.warn('there is date selected', pickDate1, valid);
      } else {
        utils.printToDom('div #reportsIngredDisplay', 'Please select the date to get the report for it!!');
      }
      break;
    case '7IngredDay':
      // console.warn('this is 7 days report', valid);
      pickDate2 = $('#7IngredDate').val();
      pickDate1 = $('#1IngredDate').val();
      if (pickDate1 && pickDate2) {
        get7DayIngredients();
        // console.warn('there is date selected', pickDate1, pickDate2, valid);
      }
      break;
    case 'allIngredDays':
      // console.warn('this is all days report');
      getAllDayIngredients();
      break;
    default:
      // do nothing
  }
};

const toggleDatePicker = (e) => {
  if (e.target.value === '1IngredDay') {
    $('#datePicker1').show();
    $('#datePicker2').hide();
  } else if (e.target.value === 'allIngredDays') {
    $('#datePicker1').hide();
    $('#datePicker2').hide();
  } else if (e.target.value === '7IngredDay') {
    $('#datePicker1').show();
    $('#datePicker2').show();
  }
};

export default { drawIngredients, pickReport, toggleDatePicker };
