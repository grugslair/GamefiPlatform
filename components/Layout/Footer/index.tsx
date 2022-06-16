import footerStyles from './Footer.module.css'

const Footer = () => {
  const menus = [
    {
      title: 'About',
      list: ['Who is Grug?', 'Rockmap', 'Team']
    },
    {
      title: 'Earn',
      list: ['IGO', 'Stake', 'How to Join']
    },
    {
      title: 'Help',
      list: ['FAQ', 'Terms & Condition']
    }
  ]


  return (
    <footer>
      <div className={`grid grid-cols-5 px-16 py-10`}>
        <div>
          <div className={`${footerStyles.footer_subtitle} mb-2`}>Grug&apos;s Lair</div>
          <div className='text-[#7E8D9A]'>Grug&apos;s is an exclusive place where blockchain enthusiast gather, share and support to top tier project</div>
        </div>
        {
          menus.map(menu => {
            return (
              <div key={menu.title}>
                <div className={`${footerStyles.footer_subtitle} mb-2`}>{menu.title}</div>
                <ul>
                  {menu.list.map(item => {
                    return (
                      <li key={item} className='mb-2'>{item}</li>
                    )
                  })}
                </ul>
              </div>
            )
          })
        }
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