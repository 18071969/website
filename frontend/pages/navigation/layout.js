//import ScrollToTopButton from "@/components/ScrollToTopButton"
import ScrollToTopButton from "../../components/ScrollToTopButton";

export default function LayoutGoTop({ children }) {
  return (
    <>
      <main>{children}</main>
      <ScrollToTopButton />
    </>
  )
}