import { useEffect } from "react";
import { Layout } from "@/component/Layout";
import Order from "@/component/Order/Order";

export default function List() {
  // Toggle the side navigation
  useEffect(() => {
    // fix next issue
    if (typeof window !== "undefined") {
      const sidebarToggle = document.body.querySelector("#sidebarToggle");

      if (sidebarToggle) {
        // 在localStorage中儲存目前sidebar情況
        if (localStorage.getItem("sb|sidebar-toggle") === "true") {
          document.body.classList.toggle("sb-sidenav-toggled");
        }

        sidebarToggle.addEventListener("click", (event) => {
          event.preventDefault();

          document.body.classList.toggle("sb-sidenav-toggled");

          localStorage.setItem(
            "sb|sidebar-toggle",
            document.body.classList.contains("sb-sidenav-toggled")
          );
        });
      }
    }
  }, []);

  return (
    <>
      <Layout>
        {/* <div className="product-container">
          {data.rows?.length &&
            data.rows.map((v) => <Card key={v.product_id} data={v}/>)}
        </div> */}
        <Order />
      </Layout>
    </>
  );
}
