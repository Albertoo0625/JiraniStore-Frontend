import { Link } from "react-router-dom";
import AdminColumns from "./AdminColumns";
import AdminList from "./AdminList";
import { ProductConsumer } from '../context';
import AdminEmpty from "./AdminEmpty";
import Excel from './Excel';
const Admin = () => {
  return (
    <section className="col-12">
      <ProductConsumer>
        {(value) => {
          const { pendingProduct } = value;
          const { getExcelData } = value;
          console.log(pendingProduct);
          if (pendingProduct.length>0) {
            return (
              <>
                <section className="col-12" style={{color:"white"}}>
                  <h1>Admins Page</h1>
                  <br />
                  <AdminColumns />
                  <AdminList value={value} />
                  <br />        
                     <div style={{position:"absolute",bottom:"0",left:"0"}}>
                     <Link to="/">Home</Link>
                      </div>
                      <br /> 
                  <div style={{position:"absolute",bottom:"0",right:"0"}}>
                  <Excel getExcelData={getExcelData}/>
                 </div>
                </section>
              </>
            )
          } else 
            return (
              <>              
                  <AdminEmpty />
              </>
            )
          }
        }
      </ProductConsumer>
    </section>
  )
}

export default Admin;
