"use client";

import React from "react";
import { Typography, Box, Container } from "@mui/material";
//import { useTheme } from "@mui/material/styles";
import FeaturedRecipeCard from "@/components/FeaturedRecipeCard";
import HomepageImage from "@/components/HomepageImage";
//import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import { useRouter } from "next/navigation";

export function HomeView() {
  // const router = useRouter();
  //const theme = useTheme();

  return (
    <Container>
      {/* Hero Section */}
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h3" fontWeight="bold">
          Welcome to my blog!
        </Typography>
        <Typography variant="subtitle1">
          Check out the recipe of the day, hand-picked for the season!
        </Typography>

        {/* Featured Recipe */}
        <FeaturedRecipeCard />

        {/* My Story section */}
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 6, mb: 2 }}>
          My Story
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          In the summer of &apos;86, I started cooking meth. Yeah, I know what
          you&apos;re thinking—“Wow, this guy must&apos;ve been a real
          mastermind.” Well, I wasn&apos;t. I wasn&apos;t breaking bad; I was
          more like mildly confused but enthusiastic about it all. The real
          turning point, though, came in the kitchen, where I started cooking up
          “the good stuff”—but it wasn&apos;t the stuff I was supposed to be
          focusing on. No, no, no, no. It was food. Delicious, drug-free,
          wholesome food.
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Now, before you judge me, let me explain. It wasn&apos;t like I went
          into this whole “meth-cooking business” with dreams of a Michelin star
          or anything. My biggest dream back then was having enough money to buy
          a new pair of shoes that weren&apos;t from a discount bin. But cooking
          meth? That&apos;s where the real science was. Who knew that mixing
          chemicals could lead to such an epiphany about food?
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
            justifyContent: "space-between",
          }}
        >
          <HomepageImage
            source="/our_images/randomwhitedude.png"
            target="https://www.ebay.com/itm/314310656876"
            bottom_text="Me cooking meth"
          />

          <HomepageImage
            source="/our_images/mymeth.png"
            target="https://www.governing.com/archive/gov-meth-lab-cleanup-program-contains-costs-for-tennessee.html"
            bottom_text="My kitchen (at the time)"
          />
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          One day, as I was stirring up a particularly volatile batch (probably
          had the wrong label on the jar, but what are you gonna do?), my
          stomach started growling like a bear with a hangover. I hadn&apos;t
          eaten since… well, I hadn&apos;t eaten in a while. So, I decided to
          take a quick break and head to the kitchen. I cracked open the
          fridge—no, not for meth supplies—just food. I found some eggs. I
          thought, “Hey, why not make an omelet?”
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Now, I&apos;ve been in kitchens before, but mostly they were kitchens
          of disaster (and not just because of the whole illegal thing I had
          going on). But this? This omelet? I was a maestro. The eggs sizzled
          perfectly, like a summer morning in a Western movie, and the cheese
          melted like… well, like cheese. This wasn&apos;t just cooking—it was a
          symphony. It was art. I thought to myself, “Who needs meth when you
          have this kind of magic?”
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          The omelet, though, was just the beginning. Soon, I started
          experimenting with different kinds of dishes. Mac and cheese? Why not
          throw in some jalapenos for a spicy kick? Chicken Alfredo? Hold up, I
          had a jar of mystery sauce I once used to melt stuff (not
          food-related, I assure you), but it worked great as a creamy base! And
          let&apos;s not even talk about my “explosive” attempt at a soufflé.
          That thing took off like a rocket, right into the ceiling. I was too
          afraid to clean the walls, but hey, it was art.
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          It didn&apos;t take long for me to realize that I was in the wrong
          business. I wasn&apos;t supposed to be cooking meth—I was born to be a
          chef. Maybe not a refined chef, but I had potential. And let&apos;s be
          real—who could say no to a guy who could cook up a perfectly balanced
          meal in a kitchen that had seen some questionable things?
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          So, I got out of the whole meth game and into the food world, opening
          a small restaurant that I called “The High Note.” Catchy, right? I was
          a little worried the name might confuse people into thinking I was
          still in the “meth” business, but they figured it out when the only
          thing I was serving was a well-seasoned roast chicken and some killer
          mashed potatoes.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
            justifyContent: "space-between",
          }}
        >
          <HomepageImage
            source="/our_images/mymankeith.jpg"
            target="https://ie.pinterest.com/pin/829014243893651377/"
            bottom_text="Me cooking filet mignon"
          />

          <HomepageImage
            source="/our_images/mykitchennow.png"
            target="https://aquakitchen.com/black-granite-countertops-sophistication-kitchen/"
            bottom_text="My kitchen now"
          />
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Turns out, the only thing that really gets you high in life is the
          perfect combination of garlic and butter. And maybe a glass of wine.
          Or three.
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          So, in a weird, twisted way, meth saved my life. Not in the way
          you&apos;d expect, but in the way that made me realize what really
          mattered: good food, real food, food that didn&apos;t make your teeth
          fall out. Maybe that&apos;s the true recipe for success.
        </Typography>
      </Box>
    </Container>
  );
}
