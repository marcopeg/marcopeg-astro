---
title: "AWS S3 File Names - Troubleshooting"
description: "How to delete S3 files that contains spaces or non ASCII characters"
pubDate: "2019-02-20T23:00:00.000Z"
updatedDate: "2021-11-01T18:33:47.000Z"
heroImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHRyYXNofGVufDB8fHx8MTYzNTc5MTU0MA&ixlib=rb-1.2.1&q=80&w=2000"
---

Today it rains, and when water pours down the window, I shouldn’t be coding at all. Actually, that would be a problem because I live in Sweden and here it rains a lot, but that is definitely not the problem I had today.

> Today’s problem is way way weird.

If you try to upload a file to S3, and that filename contains **weird characters or spaces**, you will find it **very difficult to delete it**.

Try to upload something like: `Lönebesked Marco April.pdf` (it’s my paycheck in Swedish…)

The upload works no questions asked, then when I use the AWS console and try to delete it, a generic error happens. No details, no explanations. The file doesn’t go away. WTF??

**The solution** is to use the **AWS' cli tool** and delete it from the command line, with all the spaces escaped:

```text
aws s3api delete-object --bucket my-bucket --key folder/sub\ folder/Lönebesked\ Marco\ April.pdf
```

Believe me, it wasn’t easy to find this trick out!