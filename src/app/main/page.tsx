"use client";

import { AlertBar } from '@/components/AlertBar';
import Header from '@/components/sections/Header';
import { GunshotButton } from '@/components/GunshotButton';
import { SideNotification } from '@/components/SideNotification';
import { useLocationAlerts } from '@/hooks/useLocationAlerts';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { LocateFixed, MapPin, PersonStanding, Siren, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { DefinedLocation } from '@/config/locations';
import { useState, useEffect } from 'react';
import { getDistance } from '@/lib/locationUtils';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const {
    alertState,
    simulateGunshot,
    isLoading,
    error,
    currentLocation,
    manuallySetLocation,
    selectedLocationName,
    predefinedLocations,
    showSideNotification
   } = useLocationAlerts();

   const [visualFeedback, setVisualFeedback] = useState<'safe' | 'danger' | 'gunshot' | 'idle'>('idle');

   useEffect(() => {
     if (alertState.type === 'gunshot') {
       setVisualFeedback('gunshot');
     } else if (alertState.type === 'crime') {
       setVisualFeedback('danger');
     } else if (currentLocation) {
       const currentIsDangerous = 'name' in currentLocation
         ? currentLocation.isDangerous
         : predefinedLocations.some(loc => 
             loc.isDangerous &&
             getDistance(currentLocation, loc) <= 500
           );

        if (currentIsDangerous) {
             setVisualFeedback('danger');
        } else {
             setVisualFeedback('safe');
        }
     } else {
       setVisualFeedback('idle');
     }
   }, [alertState.type, currentLocation, predefinedLocations]);

   const locationSourceDisplay = currentLocation
     ? ('name' in currentLocation ? 'Manual Selection' : 'GPS')
     : (isLoading ? 'Determining...' : 'Unavailable');

   const locationSourceIcon = currentLocation
     ? ('name' in currentLocation ? <MapPin className="h-4 w-4" /> : <LocateFixed className="h-4 w-4" />)
     : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 text-gray-800 dark:text-gray-100">
      <Header />
      <AlertBar alert={alertState} />
      <SideNotification isVisible={showSideNotification} />
      <main className="flex min-h-screen flex-col items-center justify-center p-6 pt-20">
        <h1 className="mb-4 text-center text-5xl font-extrabold mb-4 text-fuchsia-700">SafeZone</h1>

        <div className="mb-6 flex items-center justify-center space-x-2 text-muted-foreground">
           {isLoading ? (
             <Skeleton className="h-5 w-32" />
           ) : (
             <>
               {locationSourceIcon}
               <Badge variant="secondary">{locationSourceDisplay}</Badge>
             </>
           )}
         </div>

        <div className={cn(
          "w-32 h-32 rounded-full mb-8 flex items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-105",
          visualFeedback === 'idle' && 'bg-gray-200 dark:bg-gray-700',
          visualFeedback === 'safe' && 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg',
          visualFeedback === 'danger' && 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg animate-pulse',
          visualFeedback === 'gunshot' && 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-xl animate-ping'
        )}>
          {visualFeedback === 'idle' && <PersonStanding className="h-16 w-16 text-gray-500 dark:text-gray-400" />}
          {visualFeedback === 'safe' && <ShieldCheck className="h-16 w-16" />}
          {(visualFeedback === 'danger' || visualFeedback === 'gunshot') && <Siren className="h-16 w-16" />}
        </div>

        {isLoading && (
           <div className="text-center text-muted-foreground flex flex-col items-center space-y-4 w-full max-w-md">
             <p>Fetching your location and checking for alerts...</p>
             <Skeleton className="h-12 w-full max-w-xs" />
             <div className="mt-6 w-full max-w-2xl">
               <Skeleton className="h-6 w-40 mb-4 mx-auto" />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-24 w-full rounded-lg" />
               </div>
             </div>
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center text-destructive my-4 p-4 border border-destructive rounded-lg bg-destructive/10 w-full max-w-md shadow-md">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
            {error.includes("denied") && (
              <p className="mt-2 text-sm">Please enable location services in your browser settings to use GPS-based alerts.</p>
            )}
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
             {!alertState.type && !error && !currentLocation && (
                <p className="text-muted-foreground text-center">Select a location or enable GPS to check for alerts.</p>
             )}
             {!alertState.type && !error && currentLocation && (
                <p className="text-green-600 dark:text-green-400 text-center font-medium">Area clear. Stay safe!</p>
             )}

            <GunshotButton 
              onSimulate={simulateGunshot}
              disabled={!currentLocation}
              aria-label="Simulate Gunshot Event at Current Location"
            />

            <div className="mt-6 w-full">
              <h2 className="text-xl font-semibold mb-4 text-center">Select Location</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {predefinedLocations.map((location) => (
                  <Card
                    key={location.name}
                    onClick={() => manuallySetLocation(location)}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1",
                      location.isDangerous && "border-destructive bg-destructive/5 hover:bg-destructive/10",
                      selectedLocationName === location.name && "ring-2 ring-offset-2 ring-primary shadow-xl",
                      !location.isDangerous && selectedLocationName !== location.name && "border-border bg-card hover:bg-accent/70",
                      !location.isDangerous && selectedLocationName === location.name && "bg-primary/10 border-primary"
                    )}
                    aria-pressed={selectedLocationName === location.name}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') manuallySetLocation(location); }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className={cn(
                        "text-lg font-medium truncate",
                         location.isDangerous && "text-destructive",
                         !location.isDangerous && "text-card-foreground"
                       )}>
                         {location.name}
                      </CardTitle>
                      <MapPin className={cn(
                        "h-5 w-5",
                         location.isDangerous ? "text-destructive/80" : "text-muted-foreground",
                         selectedLocationName === location.name && !location.isDangerous && "text-primary/80"
                        )} />
                    </CardHeader>
                    <CardContent>
                       <p className={cn("text-xs",
                         location.isDangerous ? "text-destructive/90 font-semibold" : "text-muted-foreground",
                        )}>
                         {location.isDangerous ? 'High-Risk Area' : 'Standard Area'}
                       </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}