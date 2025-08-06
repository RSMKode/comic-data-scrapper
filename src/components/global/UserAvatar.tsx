// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { getSessionUser } from "@/app/(auth)/actions";
// import { Avatar, AvatarFallback } from '../ui/avatar';
// import { Card } from '../card/Card';
// import { CardHeader}  from '../card/CardHeader';
// import Link from 'next/link';

// type UserAvatarProps = {
//   className?: string;
// };

// export default async function UserAvatar({ className }: UserAvatarProps) {
//   const sessionUser = await getSessionUser();

//   return (
//     <>
//       {sessionUser?.token && (
//         <Popover>
//           {/* <PopoverTrigger asChild>
//             <Button
//               tooltip="Usuario"
//               className="border-2 border-transparent bg-none rounded-full p-1 hover:border-accent-primary">
//               <Avatar>
//                 <AvatarFallback>AM</AvatarFallback>
//               </Avatar>
//             </Button>
//           </PopoverTrigger> */}
//           <PopoverTrigger className="border-2 border-transparent bg-none rounded-full hover:border-foreground transition duration-200">
//             <Avatar>
//               <AvatarFallback className="text-accent-primary font-semibold">
//                 {getInitialsFromName(sessionUser.name).substring(0, 2)}
//               </AvatarFallback>
//             </Avatar>
//           </PopoverTrigger>
//           <PopoverContent className="w-fit bg-secondary border-2 border-accent-primary backdrop-blur-xs bg-secondary/70">
//             <Link href="/profile">
//               <Card className="bg-background">
//                 <CardHeader>
//                   <h4 className="text-sm flex gap-2 items-center">
//                     <span className="text-accent-primary font-semibold">
//                       {sessionUser.role.name}
//                     </span>
//                     {sessionUser.permissions.global && (
//                       <>
//                         <span>-</span>
//                         <span className="text-sm">Permisos especiales</span>
//                       </>
//                     )}
//                   </h4>
//                   <h2 className="flex gap-2 items-center">
//                     <span className="font-semibold text-lg">
//                       {sessionUser.name}
//                     </span>
//                     <span className="text-accent-primary">
//                       {sessionUser.username}
//                     </span>
//                   </h2>
//                 </CardHeader>
//               </Card>
//             </Link>
//           </PopoverContent>
//         </Popover>
//       )}
//     </>
//   );
// }
