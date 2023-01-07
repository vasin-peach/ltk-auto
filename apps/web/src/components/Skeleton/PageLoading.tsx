import { Skeleton } from '@mui/material'

export default function PageLoading() {
  return (
    <div className="  bg-black-900 p-10">
      <div className="container grid gap-5">
        <Skeleton variant="rounded" height={100} sx={{ bgcolor: 'grey.900' }} />
        <div>
          <Skeleton
            variant="text"
            sx={{ fontSize: '1rem', bgcolor: 'grey.900' }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: '1rem', bgcolor: 'grey.900' }}
          />
        </div>
        <Skeleton variant="rounded" height={200} sx={{ bgcolor: 'grey.900' }} />
        <Skeleton variant="rounded" height={300} sx={{ bgcolor: 'grey.900' }} />
      </div>
    </div>
  )
}
