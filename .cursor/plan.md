# Make Session Date/Time More Understandable

## Current Issue
The session details display: `Nov 4 • 14:00 • 50 min`

This is unclear because:
- No context (is it today? tomorrow? next week?)
- Military time (14:00) is confusing for many users
- Bullet separators feel disconnected
- No day of week

## Better Format Options

### Option 1: Descriptive with Day of Week
```
Wednesday, Nov 4 at 2:00 PM
50 min session
```

### Option 2: Relative + Time (Recommended)
```
Tomorrow at 2:00 PM • 50 min
```
or
```
Today at 2:00 PM • 50 min
```
or
```
Wed, Nov 4 at 2:00 PM • 50 min
```

### Option 3: More Compact with Context
```
Wed, Nov 4 • 2:00 PM • 50 min
```

## Recommended Implementation (Option 2/3 Hybrid)

Show relative date when applicable, otherwise show day of week:

```typescript
// Helper function to format session date/time
const formatSessionDateTime = (dateString: string, timeString: string) => {
  const sessionDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Reset hours for date comparison
  const resetTime = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };
  
  const sessionDay = resetTime(sessionDate);
  const todayDay = resetTime(today);
  const tomorrowDay = resetTime(tomorrow);
  
  let dateLabel: string;
  
  if (sessionDay.getTime() === todayDay.getTime()) {
    dateLabel = "Today";
  } else if (sessionDay.getTime() === tomorrowDay.getTime()) {
    dateLabel = "Tomorrow";
  } else {
    // Show day of week + date
    dateLabel = sessionDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  }
  
  // Convert 24-hour to 12-hour format
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const timeLabel = `${hour12}:${minutes} ${ampm}`;
  
  return { dateLabel, timeLabel };
};
```

## Updated Display

In the session card (line 236-247), replace:

```tsx
<div className="flex items-center gap-1 flex-wrap text-subhead text-muted-foreground">
  <span className="whitespace-nowrap">
    {new Date(session.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    })}
  </span>
  <span className="mx-1">•</span>
  <span className="whitespace-nowrap">{session.time}</span>
  <span className="mx-1">•</span>
  <span className="whitespace-nowrap">{session.duration} min</span>
</div>
```

With:

```tsx
<div className="flex items-center gap-1 flex-wrap text-subhead text-muted-foreground">
  {(() => {
    const sessionDate = new Date(session.date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const resetTime = (date: Date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    };
    
    const sessionDay = resetTime(sessionDate);
    const todayDay = resetTime(today);
    const tomorrowDay = resetTime(tomorrow);
    
    let dateLabel: string;
    if (sessionDay.getTime() === todayDay.getTime()) {
      dateLabel = "Today";
    } else if (sessionDay.getTime() === tomorrowDay.getTime()) {
      dateLabel = "Tomorrow";
    } else {
      dateLabel = sessionDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      });
    }
    
    // Convert to 12-hour format
    const [hours, minutes] = session.time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const timeLabel = `${hour12}:${minutes} ${ampm}`;
    
    return (
      <>
        <span className="whitespace-nowrap font-medium">{dateLabel}</span>
        <span className="mx-1">at</span>
        <span className="whitespace-nowrap font-medium">{timeLabel}</span>
        <span className="mx-1">•</span>
        <span className="whitespace-nowrap">{session.duration} min</span>
      </>
    );
  })()}
</div>
```

## Result Examples

**For a session today:**
```
Today at 2:00 PM • 50 min
```

**For a session tomorrow:**
```
Tomorrow at 2:00 PM • 50 min
```

**For a session later:**
```
Wed, Nov 4 at 2:00 PM • 50 min
```

## Benefits
- ✅ Clear context (Today/Tomorrow/Day of week)
- ✅ 12-hour format (2:00 PM instead of 14:00)
- ✅ Natural language ("at" instead of bullet)
- ✅ More scannable and understandable
- ✅ Emphasized date/time with font-medium

## Files to Modify
- `src/pages/booking/BookingHome.tsx` - Update session details display (lines 236-247)
