import AboutModal from "@/components/about-modal"

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <div>
        <AboutModal />
        <button>Notifications</button>
      </div>
    </nav>
  )
}

export default Navigation
