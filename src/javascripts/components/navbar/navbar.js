import utils from '../../helpers/utils';
import './navbar.scss';

const buildNavbar = () => {
  const domString = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><span style="margin-right: 0px;">Le Baguette. <i class="fas fa-bread-slice"></i> </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
        <div class="nav-group">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Menu</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Staff</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Ingredients</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Reservations</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Seating</a>
            </li>
          </ul>
        </div>
      </div>
      <button class="btn btn-primary">Sign In</button>
    </nav>
  `;

  utils.printToDom('#navbar', domString);
};

export default { buildNavbar };
