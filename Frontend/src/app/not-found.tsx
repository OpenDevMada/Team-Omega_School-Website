import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className='grid min-h-screen grid-cols-1 md:grid-cols-2'>
      <div className='flex flex-col items-center justify-center px-4 py-8 text-center'>
        <h2 className='mb-6 text-5xl font-semibold text-(--blue)'>Oups !</h2>
        <h3 className='mb-1.5 text-3xl font-semibold'>Page introuvable</h3>
        <p className='text-muted-foreground mb-6 max-w-sm'>
          La page que vous recherchez n'existe pas ou a été déplacée.  
          Vous pouvez retourner à l'accueil pour continuer votre navigation.
        </p>

        <Button asChild size='lg' className='rounded-lg text-base bg-(--blue) hover:bg-blue-950'>
          <a href='/'>Retour à l'accueil</a>
        </Button>
      </div>

      <div className='relative max-h-screen w-full p-2 mb-4'>
        <div className='h-full w-full rounded-2xl'></div>
        <img
          src='/not-found.svg'
          alt='404 illustration'
          className='absolute top-1/2 left-1/2 h-[clamp(260px,25vw,406px)] -translate-x-1/2 -translate-y-1/2'
        />
      </div>
    </div>
  )
}

export default NotFound;