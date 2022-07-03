import Image from 'next/image'
import Link from 'next/link'
import { ISoscialMediaImage } from '../../../types/globalTypes'
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

  const sosMedList: ISoscialMediaImage[] = [
    {
      url: '/Landing',
      img: '/twitter.png',
      width: 20,
      height: 15
    },
    {
      url: '/Landing',
      img: '/brand.png',
      width: 20,
      height: 15
    },
    {
      url: '/Landing',
      img: '/discord.png',
      width: 20,
      height: 15
    },
    {
      url: '/Landing',
      img: '/telegram.png',
      width: 20,
      height: 15
    },
  ]


  return (
    <footer className='bg-black px-8 py-4 gap-2'>
      <div className='grid grid-cols-5'>
        <div>
          <div className={`${footerStyles.footer_subtitle} mb-2`}>
            <Image
              src="/footergrug.png"
              width={150}
              height={40}
              layout="fixed"
            />
          </div>
          <div className='text-[#7E8D9A]'>
            Grug&apos;s DAO will allow both P2E and crypto trading enthusiasts to take part in the activities that we will offer in the Discord group
          </div>
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
          <ul className='flex'>
            {
              sosMedList.map((sosMed) => {
                return (
                  <li className='mr-[14px]' key={sosMed.img}>
                    <Link href={sosMed.url}>
                      <Image
                        src={sosMed.img}
                        width={sosMed.width}
                        height={sosMed.height}
                        layout="fixed"
                      />
                    </Link>
                  </li>
                )
              })
            }
          </ul>
          <div>
            ©Grug&apos;s Lair 2022
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer