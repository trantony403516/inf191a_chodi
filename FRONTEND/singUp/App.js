import logo from "./logo.svg";
import "./App.css";
import "./resources/css/style.css";
import "./resources/css/queries.css";
import "./vendors/css/normalize.css";
import "./vendors/css/grid.css";
import "./vendors/css/ionicons.min.css";

function App() {
  return (
    <div className="App">
      <header>
        <div className="hero-text-box">
          <h1>ChoDi</h1>
          <h1>Create Hope and Opportuniity by Direct Impact</h1>
          <a className="btn btn-ghost js--scroll-to-plans" href="#">
            Log In
          </a>
          <a className="btn btn-ghost js--scroll-to-start" href="#">
            Sign up
          </a>
          <h1>About us</h1>
          <h1>(Description of Company)</h1>
        </div>
      </header>

      <section className="section-form">
        <div className="row">
          <h2>Logging In</h2>
        </div>
        <div className="row">
          <form method="post" action="#" className="contact-form">
            <div className="row">
              <div className="col span-1-of-3">
                <label for="name">Username:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your username"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label for="name">Password:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Password"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col span-1-of-3">
                <input type="submit" value="Preivous" />
              </div>
              <div className="col span-1-of-3">
                <label>&nbsp;</label>
              </div>
              <div className="col span-1-of-3">
                <input type="submit" value="Next" />
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="section-form">
        <div className="row">
          <h2>Signing Up</h2>
        </div>
        <div className="row">
          <form method="post" action="#" className="contact-form">
            <div className="row">
              <div className="col span-1-of-3">
                <label>&nbsp;</label>
              </div>
              <div className="col span 2-of-3">
                <input type="submit" value="Super User" />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label>&nbsp;</label>
              </div>
              <div className="col span 2-of-3">
                <input type="submit" value="Admin User" />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label>&nbsp;</label>
              </div>
              <div className="col span 2-of-3">
                <input type="submit" value="Regular User" />
              </div>
            </div>

            <div className="row">
              <div className="col span-1-of-3">
                <input type="submit" value="Preivous" />
              </div>
              <div className="col span-1-of-3">
                <label>&nbsp;</label>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="section-form">
        <div className="row">
          <h2>Signing Up</h2>
        </div>
        <div className="row">
          <form method="post" action="#" className="contact-form">
            <div className="row">
              <div className="col span-1-of-3">
                <label for="name">First Name:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label for="name">Last Name:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label for="email">Email:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label for="name">Phone #:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your phone"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label for="name">Position:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Position"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label for="name">Username:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your username"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col span-1-of-3">
                <label for="name">Password:</label>
              </div>
              <div className="col span-2-of-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your password"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col span-1-of-3">
                <input type="submit" value="Preivous" />
              </div>
              <div className="col span-1-of-3">
                <label>&nbsp;</label>
              </div>
              <div className="col span-1-of-3">
                <input type="submit" value="Next" />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
