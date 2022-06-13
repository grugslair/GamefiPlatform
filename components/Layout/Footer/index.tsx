import footerStyles from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={`grid grid-cols-5 px-16 py-10`}>
        <div>
          <div className={footerStyles.footer_subtitle}>Grug&apos;s Lair</div>
          <div className='text-[#7E8D9A]'>Grug&apos;s is an exclusive place where blockchain enthusiast gather, share and support to top tier project</div>
        </div>
        <div>
          <div className={footerStyles.footer_subtitle}>About</div>
          <ul>
            <li>Who is Grug?</li>
            <li>Rockmap</li>
            <li>Team</li>
          </ul>
        </div>
        <div>
          <div className={footerStyles.footer_subtitle}>Earn</div>
          <ul>
            <li>IGO</li>
            <li>Stake</li>
            <li>How to Join</li>
          </ul>
        </div>
        <div>
          <div className={footerStyles.footer_subtitle}>Help</div>
          <ul>
            <li>FAQ</li>
            <li>Terms & Condition</li>
          </ul>
        </div>
        <div>
          <button>
            Buy Grug&apos;s
          </button>
          <ul>
            <li>Medium</li>
            <li>twitter</li>
            <li>discord</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer